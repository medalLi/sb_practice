package crm.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * @Author: medal
 * @Date: Created in 下午3:58 2020/5/02
 * @Description:
 */
@AllArgsConstructor
@Getter
public enum UserRoleEnum {

    ADMIN(0, "管理员"),
    NORMAL(1, "普通用户"),
    ;

    private Integer code;

    private String message;
}
