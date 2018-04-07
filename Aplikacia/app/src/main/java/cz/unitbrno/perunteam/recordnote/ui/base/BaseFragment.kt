package cz.unitbrno.perunteam.recordnote.ui.base

import android.databinding.*
import android.os.*
import android.view.*
import cz.unitbrno.perunteam.recordnote.*
import dagger.android.support.*

abstract class BaseFragment<T: BaseViewModel, B: ViewDataBinding>: DaggerFragment() {

  protected lateinit var viewModel: T
  protected lateinit var binding: B

  abstract fun createViewModel(): T

  abstract fun inflateBindingLayout(layoutInflater: LayoutInflater): B

  override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
    savedInstanceState: Bundle?): View? {
    AndroidSupportInjection.inject(this)

    viewModel = createViewModel()

    binding = inflateBindingLayout(inflater)
    binding.setVariable(BR.view, this)
    binding.setVariable(BR.viewModel, viewModel)

    return binding.root
  }
}
