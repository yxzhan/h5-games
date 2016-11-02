<?php
	$con = mysqli_connect("localhost", "root", "", "mygame");
	$sql = sprintf("SELECT `typeArr`, `map`, `name` , `id` , `step`FROM `levels`");		
	$result = mysqli_query($con,$sql);
	$arr=[];
    while ($row = mysqli_fetch_assoc($result)) {
        $arr[]=$row;
    }
	if($result===FALSE)
		die("查询数据库失败！！！". mysqli_error($con));
	echo json_encode($arr); 
?>