<?php

require_once WWW_ROOT . 'dao' . DIRECTORY_SEPARATOR . 'DAO.php';

class DaysDAO extends DAO {
    
  public function selectAll() {
    $sql = "SELECT * 
    				FROM `KK_days`";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }    

	public function selectById($id) {
		$sql = "SELECT * 
						FROM `KK_days` 
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

	public function selectByUserId($id) {
		$sql = "SELECT * 
						FROM `KK_days` 
						WHERE `user_id` = :id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':id', $id);
		$stmt->execute();
		$result = $stmt->fetch(PDO::FETCH_ASSOC);
		if($result){
			return $result;
		}
		return [];
	}

	public function selectByWeekId($id) {
		$sql = "SELECT * 
						FROM `KK_days` 
						WHERE `week_id` = :id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':id', $id);
		$stmt->execute();
		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		if($result){
			return $result;
		}
		return [];
	}	

	public function selectByFormat($format) {
		$sql = "SELECT * 
						FROM `KK_days` 
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
						FROM `KK_days` 
						WHERE `id` = :id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':id', $id);
		return $stmt->execute();
	}

	public function insert($data) {
		$errors = $this->getValidationErrors($data);
		if(empty($errors)) {
			$sql = "INSERT INTO `KK_days` (`week_id`, `user_id`, `date`) 
							VALUES (:week_id, :user_id, :date)";
			$stmt = $this->pdo->prepare($sql);
			$stmt->bindValue(':week_id', $data['week_id']);
			$stmt->bindValue(':user_id', $data['user_id']);
			$stmt->bindValue(':date', $data['date']);
			if($stmt->execute()) {
				$insertedId = $this->pdo->lastInsertId();
				return $this->selectById($insertedId);
			}
		}
		return false;
	}

	public function getValidationErrors($data) {
		$errors = array();
		if(empty($data['week_id'])) {
			$errors['week_id'] = 'field week_id has no value';
		}
		if(empty($data['user_id'])) {
			$errors['user_id'] = 'field user_id has no value';
		}
		if(empty($data['date'])) {
			$errors['date'] = 'field date has no value';
		}
		return $errors;
	}

}