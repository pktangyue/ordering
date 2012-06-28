<!DOCTYPE html>
<html>
<head>
    <title>管理员登入</title>
</head>
<body>
    <form method='post'>
        <p>用户名:<input name='user_name' type='text'/></p>
        <p>秘密:<input name='password' type='password'/></p>
        <p>
            <input type='submit' value='提交'/>
            <input type='hidden' value='login' name='submit'/>
        </p>
    </form>
</body>
</html>
