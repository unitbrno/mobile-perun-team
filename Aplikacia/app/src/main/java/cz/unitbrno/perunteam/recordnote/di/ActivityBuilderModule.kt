package cz.unitbrno.perunteam.recordnote.di

import cz.unitbrno.perunteam.recordnote.ui.main.*
import dagger.*
import dagger.android.*

@Module
abstract class ActivityBuilderModule {

  @PerScreen
  @ContributesAndroidInjector(modules = arrayOf(MainActivityModule::class))
  internal abstract fun bindMainActivity(): MainActivity

}