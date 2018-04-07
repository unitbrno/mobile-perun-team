package cz.unitbrno.perunteam.recordnote.ui.base

import android.databinding.*
import android.os.*
import android.support.annotation.*
import android.view.*
import dagger.android.*
import dagger.android.support.*
import cz.unitbrno.perunteam.recordnote.*

abstract class BaseActivity<T: BaseViewModel, B: ViewDataBinding>: DaggerAppCompatActivity() {

  protected lateinit var viewModel: T
  protected lateinit var binding: B

  abstract fun createViewModel(): T

  abstract fun inflateBindingLayout(layoutInflater: LayoutInflater): B

  @CallSuper
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    AndroidInjection.inject(this)

    viewModel = createViewModel()

    binding = inflateBindingLayout(layoutInflater)
    binding.setVariable(BR.view, this)
    binding.setVariable(BR.viewModel, viewModel)
    setContentView(binding.root)
  }
}