package cz.unitbrno.perunteam.recordnote

import cz.unitbrno.perunteam.recordnote.data.*
import io.reactivex.*
import javax.inject.*

class RecordNoteEngine @Inject constructor(
  private val recordnoteRequestService: RecordnoteRequestService) {

  fun getSubjectListFromNetwork(): Observable<Subjects> {
    return recordnoteRequestService.getSubject("http://100.65.66.32:8008/api/subject/")
  }

}