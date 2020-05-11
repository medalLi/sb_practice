package crm.entity.model;

import lombok.Data;
import lombok.ToString;
import org.springframework.data.domain.Page;

import javax.persistence.Entity;
import java.util.List;

/**
 * @author medal
 * @create 2020-05-09 9:28
 **/
@ToString
@Data
public class PageResult<C> {
    private int code; // 0 success 1 failure
    private String msg; // 错误信息
    private int count; // 总记录数
    private List<CourseOrder> data;

}
