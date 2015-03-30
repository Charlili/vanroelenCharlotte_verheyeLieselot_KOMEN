<?php

require_once WWW_ROOT . 'dao' . DIRECTORY_SEPARATOR . 'DAO.php';

class ImagesDAO extends DAO {
    
	public function selectAll() {
		$sql = "SELECT * 
						FROM `KK_images`";
		$stmt = $this->pdo->prepare($sql);
		$stmt->execute();
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}    

	public function selectById($id) {
		$sql = "SELECT * 
						FROM `KK_images` 
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
	public function selectByDayId($id) {
		$sql = "SELECT * 
						FROM `KK_images` 
						WHERE `day_id` = :id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':id', $id);
		$stmt->execute();
		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		if($result){
			return $result;
		}
		return [];
	}

	public function delete($id) {
		$sql = "DELETE 
						FROM `KK_images` 
						WHERE `id` = :id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':id', $id);
		return $stmt->execute();
	}

	public function insert($data) {
		$errors = $this->getValidationErrors($data);
		if(empty($errors)) {
			$sql = "INSERT INTO `KK_images` (`day_id`, `name`, `extension`) 
							VALUES (:day_id, :name, :extension)";
			$stmt = $this->pdo->prepare($sql);
			$stmt->bindValue(':day_id', $data['day_id']);
			$stmt->bindValue(':name', $data['name']);
			$stmt->bindValue(':extension', $data['extension']);
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
		if(empty($data['name'])) {
			$errors['name'] = 'field name has no value';
		}
		if(empty($data['extension'])) {
			$errors['extension'] = 'field extension has no value';
		}
		return $errors;
	}

}