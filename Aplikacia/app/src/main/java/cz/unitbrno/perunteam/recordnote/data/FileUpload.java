
package cz.unitbrno.perunteam.recordnote.data;

import com.google.gson.annotations.*;

public class FileUpload {

  @SerializedName("result")
  @Expose
  private FileResult result;

  public FileResult getResult() {
    return result;
  }

  public void setResult(FileResult result) {
    this.result = result;
  }
}
