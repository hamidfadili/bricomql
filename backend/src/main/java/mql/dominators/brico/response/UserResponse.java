package mql.dominators.brico.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserResponse {
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String photo;
    private String address;
    private Date birthday;
}