package cz.unitbrno.perunteam.recordnote

import cz.unitbrno.perunteam.recordnote.data.*
import io.reactivex.*
import okhttp3.*
import retrofit2.http.*
import retrofit2.http.Headers

interface PhonexiaRequestService {

  @GET("technologies")
  fun getTechnologies(): Observable<Technologies>

  @POST("audiofile")
  @Multipart
  fun postFileToServer(@Query(
    "path") fileName: String, @Part requestBody: RequestBody): Observable<FileResult>

  @GET("technologies/stt")
  fun getFileStatus(@Query("path") path: String, @Query(
    "model") lang: String): Observable<CheckResult>

  //  http://77.240.177.148:8601/audiofile?path=/smo.wav
  //  http://77.240.177.148:8601/technologies/stt?path=/smo.wav&model=CS_CZ
}