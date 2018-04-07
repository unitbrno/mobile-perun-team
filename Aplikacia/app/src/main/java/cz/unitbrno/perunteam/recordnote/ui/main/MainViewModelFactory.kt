package cz.unitbrno.perunteam.recordnote.ui.main

import cz.unitbrno.perunteam.recordnote.di.*
import cz.unitbrno.perunteam.recordnote.ui.base.*
import javax.inject.Inject
import javax.inject.Provider

@PerScreen
class MainViewModelFactory @Inject constructor(
  private val viewModelProvider: Provider<MainViewModel>):
  BaseViewModelFactory<MainViewModel>() {

  override val viewModel: MainViewModel
    get() = viewModelProvider.get()
}