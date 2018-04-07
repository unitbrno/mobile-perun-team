
package cz.unitbrno.perunteam.recordnote.data;

import com.google.gson.annotations.*;

public class Technologies {

  @SerializedName("result")
  @Expose
  private Result result;

  public Result getResult() {
    return result;
  }

  public void setResult(Result result) {
    this.result = result;
  }
}
