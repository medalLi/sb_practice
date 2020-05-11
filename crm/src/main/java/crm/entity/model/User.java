package crm.entity.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.ToString;
import org.hibernate.validator.constraints.NotBlank;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

import java.util.Date;


@ToString
@Data
@Entity
@Table(name = "sb_test")
@EntityListeners(AuditingEntityListener.class)
public class User {
	@Id
	@Column(name = "name")
	private String name; // 称

	@Column(name = "type")
	private String type; // 类型

	@Column(name = "ip")
	private String ip;  //ip

	@NotBlank
	@Column(name = "port")
	private String port; // 端口

	@Column(name = "user")
	private String user; // 用户名

	@Column(name = "passwd")
	private String password; // 密码

	@LastModifiedDate
    @Column(name = "last_update_time" )
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date lastUpdateTime; //最后更新时间

}
