
package cz.unitbrno.perunteam.recordnote.data;

import com.google.gson.annotations.*;

public class FileInfo {

  @SerializedName("name")
  @Expose
  private String name;
  @SerializedName("last_modified")
  @Expose
  private String lastModified;
  @SerializedName("created")
  @Expose
  private String created;
  @SerializedName("size")
  @Expose
  private Integer size;
  @SerializedName("is_directory")
  @Expose
  private Boolean isDirectory;
  @SerializedName("is_registered")
  @Expose
  private Boolean isRegistered;
  @SerializedName("frequency")
  @Expose
  private Integer frequency;
  @SerializedName("length")
  @Expose
  private Double length;
  @SerializedName("n_channels")
  @Expose
  private Integer nChannels;
  @SerializedName("format")
  @Expose
  private String format;

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getLastModified() {
    return lastModified;
  }

  public void setLastModified(String lastModified) {
    this.lastModified = lastModified;
  }

  public String getCreated() {
    return created;
  }

  public void setCreated(String created) {
    this.created = created;
  }

  public Integer getSize() {
    return size;
  }

  public void setSize(Integer size) {
    this.size = size;
  }

  public Boolean getIsDirectory() {
    return isDirectory;
  }

  public void setIsDirectory(Boolean isDirectory) {
    this.isDirectory = isDirectory;
  }

  public Boolean getIsRegistered() {
    return isRegistered;
  }

  public void setIsRegistered(Boolean isRegistered) {
    this.isRegistered = isRegistered;
  }

  public Integer getFrequency() {
    return frequency;
  }

  public void setFrequency(Integer frequency) {
    this.frequency = frequency;
  }

  public Double getLength() {
    return length;
  }

  public void setLength(Double length) {
    this.length = length;
  }

  public Integer getNChannels() {
    return nChannels;
  }

  public void setNChannels(Integer nChannels) {
    this.nChannels = nChannels;
  }

  public String getFormat() {
    return format;
  }

  public void setFormat(String format) {
    this.format = format;
  }
}
