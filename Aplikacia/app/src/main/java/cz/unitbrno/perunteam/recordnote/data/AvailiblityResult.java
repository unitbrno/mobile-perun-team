
package cz.unitbrno.perunteam.recordnote.data;

import com.google.gson.annotations.*;

public class AvailiblityResult {

  @SerializedName("version")
  @Expose
  private Integer version;
  @SerializedName("name")
  @Expose
  private String name;
  @SerializedName("info")
  @Expose
  private Info info;

  public Integer getVersion() {
    return version;
  }

  public void setVersion(Integer version) {
    this.version = version;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Info getInfo() {
    return info;
  }

  public void setInfo(Info info) {
    this.info = info;
  }
}
