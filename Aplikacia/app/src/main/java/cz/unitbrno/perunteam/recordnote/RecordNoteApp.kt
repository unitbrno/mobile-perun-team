package cz.unitbrno.perunteam.recordnote

import cz.unitbrno.perunteam.recordnote.di.*
import dagger.android.*
import timber.log.*

class RecordNoteApp: DaggerApplication() {

  override fun applicationInjector(): AndroidInjector<out DaggerApplication> {
    val component: AppComponent = DaggerAppComponent.builder().application(this).build()
    return component
  }

  override fun onCreate() {
    super.onCreate();

    if (BuildConfig.DEBUG) {
      Timber.plant(Timber.DebugTree())
    }
  }

}