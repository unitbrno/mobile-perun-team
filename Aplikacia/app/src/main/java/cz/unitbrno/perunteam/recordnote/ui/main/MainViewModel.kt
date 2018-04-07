package cz.unitbrno.perunteam.recordnote.ui.main

import android.media.*
import android.os.*
import cz.unitbrno.perunteam.recordnote.*
import cz.unitbrno.perunteam.recordnote.di.*
import cz.unitbrno.perunteam.recordnote.ui.base.*
import io.reactivex.android.schedulers.*
import io.reactivex.schedulers.*
import omrecorder.*
import timber.log.*
import java.io.*
import java.util.*
import javax.inject.*

@PerScreen
class MainViewModel @Inject constructor(
  private val phonexiaEngine: PhonexiaEngine,
  private val recordNoteEngine: RecordNoteEngine): BaseViewModel() {

  lateinit var recorder: Recorder
  lateinit var random: Random
  lateinit var file: File

  fun getSomething() {
    phonexiaEngine.getTechnologiesFromNetwork()
      .subscribeOn(Schedulers.io())
      .observeOn(AndroidSchedulers.mainThread())
      .subscribe(
        { result -> Timber.d("Result: %s", result) },
        { error -> Timber.d("Error idiota man %s", error) }
      )
  }

  fun uploadFileToServer() {
    phonexiaEngine.postNewAudioToNetwork(file.absolutePath)
      .subscribeOn(Schedulers.io())
      .observeOn(AndroidSchedulers.mainThread())
      .subscribe(
        { result -> Timber.d("UPLOAD FILE: %s", result) },
        { error -> Timber.d("Error idiota man %s", error) }
      )

    //    getFileStatusFromServer()
  }

  fun getFileStatusFromServer() {
    phonexiaEngine.checkFileResultFromNetwork()
      .subscribeOn(Schedulers.io())
      .observeOn(AndroidSchedulers.mainThread())
      .subscribe(
        { result -> Timber.d("UPLOAD FILE: %s", result) },
        { error -> Timber.d("Error idiota man %s", error) }
      )
  }

  fun getSomethingFromOurServer() {
    recordNoteEngine.getSubjectListFromNetwork()
      .subscribeOn(Schedulers.io())
      .observeOn(AndroidSchedulers.mainThread())
      .subscribe(
        { result -> Timber.d("Result: %s", result) },
        { error -> Timber.d("Error hmmm %s", error) }
      )
  }

  fun startRecording() {
    createRecorder()
    recorder.startRecording()
  }

  fun stopRecording() {
    recorder.stopRecording()
  }

  fun createRecorder() {
    recorder = OmRecorder.wav(
      PullTransport.Default(mic(),
        PullTransport.OnAudioChunkPulledListener {
        }), file())
  }

  private fun mic(): PullableSource {
    return PullableSource.Default(
      AudioRecordConfig.Default(
        MediaRecorder.AudioSource.MIC, AudioFormat.ENCODING_PCM_16BIT,
        AudioFormat.CHANNEL_IN_MONO, 44100
      )
    )
  }

  private fun file(): File {
    file = File(Environment.getExternalStorageDirectory(),
      "recordNote" + createRandomAudioFileName(5) + ".wav")
    return file
  }

  private fun createRandomAudioFileName(string: Int): String {
    var randomAudioFileName = "1234567890"
    random = Random()
    val stringBuilder = StringBuilder(string)

    var i = 0
    while (i < string) {
      stringBuilder.append(randomAudioFileName[random.nextInt(randomAudioFileName.length)])
      i++
    }
    return stringBuilder.toString()

  }
}