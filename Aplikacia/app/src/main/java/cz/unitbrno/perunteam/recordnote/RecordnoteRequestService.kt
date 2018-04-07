package cz.unitbrno.perunteam.recordnote

import cz.unitbrno.perunteam.recordnote.data.*
import io.reactivex.*
import retrofit2.http.*

interface RecordnoteRequestService {

  @GET
  fun getSubject(@Url url: String): Observable<Subjects>

}