
package cz.unitbrno.perunteam.recordnote.data;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class FileResult {

    @SerializedName("version")
    @Expose
    private Integer version;
    @SerializedName("name")
    @Expose
    private String name;
    @SerializedName("info")
    @Expose
    private FileInfo info;

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

    public FileInfo getInfo() {
        return info;
    }

    public void setInfo(FileInfo info) {
        this.info = info;
    }

}
