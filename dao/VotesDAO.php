<?php

require_once WWW_ROOT . 'dao' . DIRECTORY_SEPARATOR . 'DAO.php';

class VotesDAO extends DAO {
    
  public function selectAll() {
    $sql = "SELECT * 
    				FROM `KK_votes`";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }    

	public function selectById($id) {
		$sql = "SELECT * 
						FROM `KK_votes` 
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

	public function selectByDayAndUser($day_id,$user_id) {
		$sql = "SELECT * 
						FROM `KK_votes` 
						WHERE `day_id` = :day_id AND
						`user_id` = :user_id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':day_id', $day_id);
		$stmt->bindValue(':user_id', $user_id);
		$stmt->execute();
		$result = $stmt->fetch(PDO::FETCH_ASSOC);
		if($result){
			return $result;
		}
		return [];
	}	

	public function selectByFormat($format) {
		$sql = "SELECT * 
						FROM `KK_votes` 
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
						FROM `KK_votes` 
						WHERE `id` = :id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':id', $id);
		return $stmt->execute();
	}

	public function update($id, $data) {
		$errors = $this->getValidationErrors($data);
		if(empty($errors)) {
			$sql = "UPDATE `KK_votes` 
							SET `gebak` = :gebak, 
								`gelach` = :gelach,
								`geur` = :geur
							WHERE `id` = :id";
			$stmt = $this->pdo->prepare($sql);
			$stmt->bindValue(':gebak', $data['gebak']);
			$stmt->bindValue(':gelach', $data['gelach']);
			$stmt->bindValue(':geur', $data['geur']);
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
			$sql = "INSERT INTO `KK_votes` (`day_id`, `user_id`, `gebak`, `gelach`, `geur`) 
							VALUES (:day_id, :user_id, :gebak, :gelach, :geur)";
			$stmt = $this->pdo->prepare($sql);
			$stmt->bindValue(':day_id', $data['day_id']);
			$stmt->bindValue(':user_id', $data['user_id']);
			$stmt->bindValue(':gebak', $data['gebak']);
			$stmt->bindValue(':gelach', $data['gelach']);
			$stmt->bindValue(':geur', $data['geur']);
			if($stmt->execute()) {
				$insertedId = $this->pdo->lastInsertId();
				return $this->selectById($insertedId);
			}
		}
		return false;
	}

	public function getValidationErrors($data) {
		$errors = array();
		if(empty($data['day_id'])) {
			$errors['day_id'] = 'field day_id has no value';
		}
		if(empty($data['user_id'])) {
			$errors['user_id'] = 'field user_id has no value';
		}
		
		return $errors;
	}

}