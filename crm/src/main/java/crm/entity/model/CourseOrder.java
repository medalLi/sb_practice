package crm.entity.model;

import lombok.Data;
import lombok.ToString;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

/**
 * @author medal
 * @create 2020-05-09 9:28
 **/
@ToString
@Data
@Entity
@Table(name = "t_course_order")
@EntityListeners(AuditingEntityListener.class)
public class CourseOrder {
    @Id
    private String uuid;
    private String order_id;
    private String wechat_mark;
    private String qq_no;
    private String tel;
    private String course_name;
    private String course_price;
    private String order_date;
    private Date update_datetime;
    private String remark;
}
