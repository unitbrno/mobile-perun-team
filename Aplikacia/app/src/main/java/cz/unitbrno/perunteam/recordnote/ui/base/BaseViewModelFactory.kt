package cz.unitbrno.perunteam.recordnote.ui.base

import android.arch.lifecycle.*

abstract class BaseViewModelFactory<out T : BaseViewModel> : ViewModelProvider.Factory {

  abstract val viewModel : T

  override fun <T : ViewModel> create(modelClass: Class<T>): T {
    return viewModel as T
  }
}