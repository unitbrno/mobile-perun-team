from celery import shared_task
from api.api_stt import api_stt, STTApiException, STTApiExceptionEndProcess
from unidecode import unidecode

# MAX_RETRIES = 20
MAX_RETRIES = 9999999999999
# MAX_RETRIES = None
START_KEYWORDS = {"zacatek" : "",
                  "zapisu": ""}
STOP_KEYWORDS = {"konec": "",
                 "zapisu": ""}

KEYWORDS = ["ukol", "ukoly", "prace"]

@shared_task(ignore_result=False)
def test_task_periodic():
    print("testovacia task")
    return "SUCCESS"


@shared_task(bind=True, ignore_result=False)
def get_answer(self, tape_id):
    from subject.models import Tape
    tape = Tape.objects.get(pk=tape_id)

    # v pripade chyba sa dana taska naplanuje jeste raz, maximalne opakovanie tasky je 20 krat
    try:
        r = api_stt.get_results(tape.result_url)
    except STTApiExceptionEndProcess:
        return "Dobule call"
    except STTApiException as e:
        self.retry(countdown=5, exc=e, max_retries=MAX_RETRIES)

    if 'info' in r['result']:
        self.retry(countdown=5, max_retries=MAX_RETRIES)

    tape.stt_output = r

    try:
        segmentation = tape.stt_output['result']['one_best_result']['segmentation']
        result = ""
        highlight_start = ""
        highlight_stop = ""
        for item in segmentation:
            if item['word'] in ("<sil/>", "</s>", "<s>"):
                continue
            elif item['word'] in ['.', ',', '?', '!']:
                result += "\n"
            word = unidecode(item['word']).lower()
            if word in START_KEYWORDS.keys():
                if START_KEYWORDS['zacatek'] and word == "zapisu":
                    result += "**" + START_KEYWORDS['zacatek'] + " " + item['word'] + "**" + " "
                elif word == 'zacatek':
                    START_KEYWORDS['zacatek'] = item['word']
                else:
                    result += item['word'] + " "

            elif word in STOP_KEYWORDS.keys():
                if STOP_KEYWORDS['konec'] and word == "zapisu":
                    result += "**" + STOP_KEYWORDS['konec'] + " " + item['word'] + "**" + " "
                elif word == 'konec':
                    STOP_KEYWORDS['konec'] = item['word']
                else:
                    result += item['word'] + " "

            elif word.lower() in KEYWORDS:
                result += "**" + item['word'] + "**" + " "

            else:
                if START_KEYWORDS['zacatek']:
                    result += START_KEYWORDS['zacatek'] + " "
                if STOP_KEYWORDS['konec']:
                    result += START_KEYWORDS['konec'] + " "
                result += item['word'] + " "
                START_KEYWORDS['zacatek'] = ""
                STOP_KEYWORDS['konec'] = ""
        tape.text = result
       
    except KeyError:
        raise KeyError("Output doesn't exists")

    tape.save()     

    return "SUCCESS"

    #TODO spracujem , update chank
