
package cz.unitbrno.perunteam.recordnote.data;

import java.util.*;

import com.google.gson.annotations.*;

public class Technology {

  @SerializedName("name")
  @Expose
  private String name;
  @SerializedName("abbreviation")
  @Expose
  private String abbreviation;
  @SerializedName("models")
  @Expose
  private List<Model> models = null;

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getAbbreviation() {
    return abbreviation;
  }

  public void setAbbreviation(String abbreviation) {
    this.abbreviation = abbreviation;
  }

  public List<Model> getModels() {
    return models;
  }

  public void setModels(List<Model> models) {
    this.models = models;
  }
}
