package cz.unitbrno.perunteam.recordnote.ui.main

import android.Manifest.permission.*
import android.arch.lifecycle.*
import android.content.pm.*
import android.os.*
import android.support.v4.app.*
import android.support.v4.content.*
import android.view.*
import android.widget.*
import cz.unitbrno.perunteam.recordnote.databinding.*
import cz.unitbrno.perunteam.recordnote.ui.base.*
import javax.inject.*

class MainActivity: BaseActivity<MainViewModel, ActivityMainBinding>(), MainView {

  val RequestPermissionCode = 1010

  @Inject
  lateinit var viewModelFactory: MainViewModelFactory

  override fun createViewModel(): MainViewModel = ViewModelProviders.of(this, viewModelFactory).get(
    MainViewModel::class.java)

  override fun inflateBindingLayout(
    layoutInflater: LayoutInflater): ActivityMainBinding = ActivityMainBinding.inflate(
    layoutInflater)

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    if (!checkDirectoriesPermisions()) {
      requestPermission()
    }

    viewModel.getSomething()
    viewModel.getSomethingFromOurServer()

    binding.recordButton.setOnClickListener {
      binding.recordButton.isEnabled = false
      binding.stopButton.isEnabled = true
      viewModel.startRecording()
    }

    binding.stopButton.setOnClickListener {
      binding.recordButton.isEnabled = true
      binding.stopButton.isEnabled = false
      viewModel.stopRecording()
      viewModel.uploadFileToServer()
    }
  }

  override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<String>,
    grantResults: IntArray) {
    when (requestCode) {
      RequestPermissionCode -> if (grantResults.isNotEmpty()) {

        val storagePermission = grantResults[0] == PackageManager.PERMISSION_GRANTED
        val recordPermission = grantResults[1] == PackageManager.PERMISSION_GRANTED

        if (storagePermission && recordPermission) {

          Toast.makeText(this@MainActivity, "Permission Granted", Toast.LENGTH_LONG).show()
        } else {
          Toast.makeText(this@MainActivity, "Permission Denied", Toast.LENGTH_LONG).show()

        }
      }
    }
  }

  private fun requestPermission() {
    ActivityCompat.requestPermissions(this@MainActivity,
      arrayOf(WRITE_EXTERNAL_STORAGE, RECORD_AUDIO), RequestPermissionCode)
  }

  private fun checkDirectoriesPermisions(): Boolean {
    val result = ContextCompat.checkSelfPermission(applicationContext, WRITE_EXTERNAL_STORAGE)
    val result1 = ContextCompat.checkSelfPermission(applicationContext, RECORD_AUDIO)

    return result == PackageManager.PERMISSION_GRANTED && result1 == PackageManager.PERMISSION_GRANTED
  }
}