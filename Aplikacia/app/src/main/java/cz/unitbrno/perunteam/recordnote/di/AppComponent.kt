package cz.unitbrno.perunteam.recordnote.di

import cz.unitbrno.perunteam.recordnote.*
import dagger.*
import dagger.android.*
import dagger.android.support.*
import javax.inject.*

@Singleton
@Component(
  modules = [(AndroidInjectionModule::class),
    (AndroidSupportInjectionModule::class),
    (AppModule::class),
    (ActivityBuilderModule::class),
    (FragmentBuilderModule::class),
    (NetModule::class)])
interface AppComponent: AndroidInjector<RecordNoteApp> {

  @Component.Builder
  interface Builder {

    @BindsInstance
    fun application(application: RecordNoteApp): Builder

    fun build(): AppComponent
  }

  override fun inject(recordNoteApp: RecordNoteApp)
}