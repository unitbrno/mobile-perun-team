
package cz.unitbrno.perunteam.recordnote.data;

import com.google.gson.annotations.*;

public class CheckResult {

  @SerializedName("result")
  @Expose
  private AvailiblityResult result;

  public AvailiblityResult getResult() {
    return result;
  }

  public void setResult(AvailiblityResult result) {
    this.result = result;
  }
}
