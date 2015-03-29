<?php

require_once WWW_ROOT . 'dao' . DIRECTORY_SEPARATOR . 'DAO.php';

class UsersDAO extends DAO {
    
	public function selectAll() {
    	$sql = "SELECT * 
    					FROM `KK_users`";
    	$stmt = $this->pdo->prepare($sql);
    	$stmt->execute();
    	return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}    

	public function selectById($id) {
		$sql = "SELECT * 
						FROM `KK_users` 
						WHERE `id` = :id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':id', $id);
		$stmt->execute();
		$result = $stmt->fetch(PDO::FETCH_ASSOC);
		if($result){
			return $result;
		}
		return [];
	}

	public function selectByEmail($email) {
		$sql = "SELECT * 
						FROM `KK_users` 
						WHERE `email` = :email";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':email', $email);
		$stmt->execute();
		$result = $stmt->fetch(PDO::FETCH_ASSOC);
		if($result){
			return $result;
		}
		return [];
	}

	public function selectByWeek($week_id) {
		$sql = "SELECT * 
						FROM `KK_users` 
						WHERE `week_id` = :week_id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':week_id', $week_id);
		$stmt->execute();
		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		if($result){
			return $result;
		}
		return [];
	}	

	public function selectByFormat($format) {
		$sql = "SELECT * 
						FROM `KK_users` 
						WHERE `format` = :format";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':format', $format);
		$stmt->execute();
		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		if($result){
			return $result;
		}
		return [];
	}

	public function delete($id) {
		$sql = "DELETE 
						FROM `KK_users` 
						WHERE `id` = :id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':id', $id);
		return $stmt->execute();
	}

	public function update($id, $data) {
		$errors = $this->getValidationErrors($data);
		if(empty($errors)) {
			$sql = "UPDATE `KK_users` 
							SET `week_id` = :week_id,
								`extension` = :extension
							WHERE `id` = :id";
			$stmt = $this->pdo->prepare($sql);
			$stmt->bindValue(':week_id', $data['week_id']);
			$stmt->bindValue(':extension', $data['extension']);
			$stmt->bindValue(':id', $id);
			if($stmt->execute()) {
				return $this->selectById($id);
			}
		}
		return false;
	}	

	public function insert($data) {
		$errors = $this->getValidationErrors($data);
		if(empty($errors)) {
			$sql = "INSERT INTO `KK_users` (`name`, `email`, `password`, `street`, `town`) 
							VALUES (:name, :email, :password, :street, :town)";
			$stmt = $this->pdo->prepare($sql);
			$stmt->bindValue(':name', $data['name']);
			$stmt->bindValue(':email', $data['email']);
			$stmt->bindValue(':password', $data['password']);
			$stmt->bindValue(':street', $data['street']);
			$stmt->bindValue(':town', $data['town']);
			if($stmt->execute()) {
				$insertedId = $this->pdo->lastInsertId();
				return $this->selectById($insertedId);
			}
		}
		return false;
	}

	public function getValidationErrors($data) {
		$errors = array();
		if(empty($data['name'])) {
			$errors['name'] = 'field name has no value';
		}
		if(empty($data['email'])) {
			$errors['email'] = 'field email has no value';
		}
		if(empty($data['password'])) {
			$errors['password'] = 'field password has no value';
		}
		if(empty($data['street'])) {
			$errors['street'] = 'field street has no value';
		}
		if(empty($data['town'])) {
			$errors['town'] = 'field town has no value';
		}
		return $errors;
	}

}