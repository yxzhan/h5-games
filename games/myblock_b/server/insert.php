<?php
	sleep(1);
	$con = mysqli_connect("localhost", "root", "", "mygame");
	$typeArr=mysqli_real_escape_string($con,$_POST['typeArr']);
	$map=mysqli_real_escape_string($con,$_POST['map']);
	$name=mysqli_real_escape_string($con,$_POST['name']);
	$step=mysqli_real_escape_string($con,$_POST['step']);
	$sql = sprintf("INSERT INTO `levels` (`typeArr`, `map`, `name`, `step`) 
		VALUES ('%s','%s','%s','%d')", $typeArr, $map, $name, $step);
	$result = mysqli_query($con,$sql);
	if($result===FALSE){
		die("查询数据库失败！！！". mysqli_error($con));
	}else{
		echo "insert Success!";
	}
?>