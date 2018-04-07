package cz.unitbrno.perunteam.recordnote.di

import android.util.*
import com.google.gson.*
import com.jakewharton.retrofit2.adapter.rxjava2.*
import cz.unitbrno.perunteam.recordnote.*
import dagger.*
import io.reactivex.schedulers.*
import okhttp3.*
import okio.*
import retrofit2.*
import retrofit2.Retrofit
import retrofit2.converter.gson.*
import timber.log.*
import java.io.*
import javax.inject.*

@Module
class NetModule {

  val URL_BACKEND = "http://77.240.177.148:8601"

  /**
   * Size of the HTTP client cache.
   */
  val CLIENT_CACHE_SIZE = 10 * 1024 * 1024L  // 10 megabytes

  @Provides
  @Singleton
  fun provideClient(context: RecordNoteApp): OkHttpClient {
    return createClient(context)
  }

  @Provides
  @Singleton
  fun provideGson(): GsonConverterFactory {
    val gson = GsonBuilder()
      .setDateFormat("yyyy-MM-dd'T'HH:mm:ssZ")
      .create()
    return GsonConverterFactory.create(gson)
  }

  @Provides
  fun providesRetrofit(context: RecordNoteApp, client: OkHttpClient,
    gsonConverterFactory: GsonConverterFactory): Retrofit {
    return createRetrofit(client, gsonConverterFactory, URL_BACKEND)
  }

  @Provides
  fun providePhonexiaRequestService(retrofit: Retrofit): PhonexiaRequestService {
    return retrofit.create(PhonexiaRequestService::class.java)
  }

  @Provides
  fun provideRecordnoteRequestService(retrofit: Retrofit): RecordnoteRequestService {
    return retrofit.create(RecordnoteRequestService::class.java)
  }

  private fun createClient(context: RecordNoteApp): OkHttpClient {
    val credentials: String = "team1:hackathon"
    val cryptedCredentials: String = "Basic " + Base64.encodeToString(
      credentials.toByteArray(),
      Base64.NO_WRAP)
    val authCode = "Basic dGVhbTE6aGFja2F0aG9u"
    val builder = OkHttpClient.Builder()
    builder.addInterceptor { chain ->
      val request = chain.request().newBuilder()
        .addHeader("Content-Type", "application/json")
        .addHeader("Accept", "application/json")
        .addHeader("Authorization", cryptedCredentials)
        .build()
      Timber.d("Request: [%s] %s", request.method(), request.url())
      Timber.d("Request: %s", request.headers().toString())
      if (request.body() != null) {
        Timber.d("Request: %s", bodyToString(request.body()!!))
      }
      chain.proceed(request)
    }
    builder.cache(Cache(context.cacheDir, CLIENT_CACHE_SIZE))

    return builder.build()
  }

  private fun createRetrofit(
    client: OkHttpClient, factory: Converter.Factory, baseUrl: String
  ): Retrofit {
    return Retrofit.Builder()
      .baseUrl(baseUrl)
      .client(client)
      .addCallAdapterFactory(RxJava2CallAdapterFactory.createWithScheduler(Schedulers.io()))
      .addConverterFactory(factory)
      .build()
  }

  private fun bodyToString(request: RequestBody): String {
    return try {
      val buffer = Buffer()
      request.writeTo(buffer)
      buffer.readUtf8()
    } catch (e: IOException) {
      "Do not work :/"
    }

  }

  private fun headersToString(request: Request): String {
    if (BuildConfig.DEBUG) {
      val headers = request.newBuilder()
        .build()
        .headers()
      if (headers != null) {
        return headers.toMultimap().toString()
      }
    }
    return ""
  }
}