<section id="contact">

    <h1>Login Form</h1>

    <div id="loginpage">

        <h3>Login with Username and Password</h3>
        <form name='loginForm'>
            <table>
                <tr>
                    <td>Username:</td>
                    <td><input type='text' id="username" name='username'></td>
                </tr>
                <tr>
                    <td>Password:</td>
                    <td><input type='password' id="password" name='password' /></td>
                </tr>
                <tr>
                    <td colspan='2'><input name="submit" type="submit" id="login-button"
                                           value="submit" /></td>
                </tr>
            </table>

            <input type="hidden" name="${_csrf.parameterName}"
                   value="${_csrf.token}" />

        </form>
    </div>

</section>