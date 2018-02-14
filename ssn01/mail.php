<?php
	$msg_box = ""; // в этой переменной будем хранить сообщения формы
	$errors = array(); // контейнер для ошибок
		// собираем данные из формы
		$message  = "Имя: " . $_POST['name'] . "<br/>
						E-mail: " . $_POST['email'] . "<br/>
						Компания: " . $_POST['company'] . "<br/>
						Детали проекта: " . $_POST['detail'] . "<br/>";
		send_mail($message); // отправим письмо
		// выведем сообщение об успехе

	// делаем ответ на клиентскую часть в формате JSON
	echo json_encode(array(
		'result' => "ok"
	));
	// функция отправки письма
	function send_mail($message){
		// почта, на которую придет письмо
		$mail_to = "anastasi.smch@gmail.com"; // 
		// тема письма
		$subject = "Forms";
		// заголовок письма
		$headers= "Content-type: text/html; charset=utf-8\r\n"; // кодировка письма
		// отправляем письмо
		mail($mail_to, $subject, $message, $headers);
	}
