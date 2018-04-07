package cz.unitbrno.perunteam.recordnote.di

import android.content.*
import cz.unitbrno.perunteam.recordnote.*
import dagger.*

@Module
class AppModule {

  @Provides
  @ApplicationContext
  fun applicationContext(recordNoteApp: RecordNoteApp): Context {
    return recordNoteApp
  }
}