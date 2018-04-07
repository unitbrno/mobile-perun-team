
package cz.unitbrno.perunteam.recordnote.data;

import com.google.gson.annotations.*;

public class Model {

  @SerializedName("name")
  @Expose
  private String name;
  @SerializedName("version")
  @Expose
  private String version;
  @SerializedName("n_total_instancies")
  @Expose
  private Integer nTotalInstancies;
  @SerializedName("n_busy_instancies")
  @Expose
  private Integer nBusyInstancies;

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getVersion() {
    return version;
  }

  public void setVersion(String version) {
    this.version = version;
  }

  public Integer getNTotalInstancies() {
    return nTotalInstancies;
  }

  public void setNTotalInstancies(Integer nTotalInstancies) {
    this.nTotalInstancies = nTotalInstancies;
  }

  public Integer getNBusyInstancies() {
    return nBusyInstancies;
  }

  public void setNBusyInstancies(Integer nBusyInstancies) {
    this.nBusyInstancies = nBusyInstancies;
  }
}
