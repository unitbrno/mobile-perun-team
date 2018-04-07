package cz.unitbrno.perunteam.recordnote

import cz.unitbrno.perunteam.recordnote.data.*
import io.reactivex.*
import okhttp3.*
import java.io.*
import java.net.*
import javax.inject.*

class PhonexiaEngine @Inject constructor(
  private val phonexiaRequestService: PhonexiaRequestService) {

  lateinit var file: File

  fun getTechnologiesFromNetwork(): Observable<Technologies> {
    return phonexiaRequestService.getTechnologies()
  }

  fun postNewAudioToNetwork(url: String): Observable<FileResult> {
    file = File(url)
    var bytes:ByteArray = file.readBytes()
    var finalFile = bytes
    val fbody = RequestBody.create(MediaType.parse("audio"), finalFile)

    return phonexiaRequestService.postFileToServer(file.name, fbody)
  }

  fun checkFileResultFromNetwork(): Observable<CheckResult> {
    return phonexiaRequestService.getFileStatus(file.name, "CS_CZ")
  }

}