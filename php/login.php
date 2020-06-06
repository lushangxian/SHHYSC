<?php
include "conn.php";

if (isset($_POST['sjh']) && isset($_POST['yzm'])) {
    $sjh = $_POST['sjh'];
    $yzm = $_POST['yzm'];
    $result = $conn->query("select * from registrysm where shoujihao='$sjm' and yanzhengma='$yzm'");
    if ($result->fetch_assoc()) { //匹配成功
        echo true;
    } else { //匹配不成功
        echo false;
    }
}
