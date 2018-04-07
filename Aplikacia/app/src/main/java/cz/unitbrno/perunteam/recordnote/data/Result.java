
package cz.unitbrno.perunteam.recordnote.data;

import java.util.*;

import com.google.gson.annotations.*;

public class Result {

  @SerializedName("version")
  @Expose
  private Integer version;
  @SerializedName("name")
  @Expose
  private String name;
  @SerializedName("technologies")
  @Expose
  private List<Technology> technologies = null;

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

  public List<Technology> getTechnologies() {
    return technologies;
  }

  public void setTechnologies(List<Technology> technologies) {
    this.technologies = technologies;
  }
}
