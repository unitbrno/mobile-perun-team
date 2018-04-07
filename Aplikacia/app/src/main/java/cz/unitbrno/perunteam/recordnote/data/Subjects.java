
package cz.unitbrno.perunteam.recordnote.data;

import java.util.*;

import com.google.gson.annotations.*;

public class Subjects {

  @SerializedName("count")
  @Expose
  private Integer count;
  @SerializedName("next")
  @Expose
  private Object next;
  @SerializedName("previous")
  @Expose
  private Object previous;
  @SerializedName("results")
  @Expose
  private List<SubjectResult> results = null;

  public Integer getCount() {
    return count;
  }

  public void setCount(Integer count) {
    this.count = count;
  }

  public Object getNext() {
    return next;
  }

  public void setNext(Object next) {
    this.next = next;
  }

  public Object getPrevious() {
    return previous;
  }

  public void setPrevious(Object previous) {
    this.previous = previous;
  }

  public List<SubjectResult> getResults() {
    return results;
  }

  public void setResults(List<SubjectResult> results) {
    this.results = results;
  }
}
