<?php

require_once WWW_ROOT . 'dao' . DIRECTORY_SEPARATOR . 'DAO.php';

class WeeksDAO extends DAO {
    
  public function selectAll() {
    $sql = "SELECT * 
    				FROM `KK_weeks`";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  } 

  public function selectLast() {
    $sql = "SELECT * 
    				FROM `KK_weeks` 
    				ORDER BY `id` 
    				DESC";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }    

	public function selectById($id) {
		$sql = "SELECT * 
						FROM `KK_weeks` 
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

	public function update($id, $data) {
		$errors = $this->getValidationErrors($data);
		if(empty($errors)) {
			$sql = "UPDATE `KK_weeks` 
							SET `day1_id` = :day1_id, 
								`day2_id` = :day2_id,
								`day3_id` = :day3_id,
								`day4_id` = :day4_id,
								`currentDate` = :currentDate
							WHERE `id` = :id";
			$stmt = $this->pdo->prepare($sql);
			$stmt->bindValue(':day1_id', $data['day1_id']);
			$stmt->bindValue(':day2_id', $data['day2_id']);
			$stmt->bindValue(':day3_id', $data['day3_id']);
			$stmt->bindValue(':day4_id', $data['day4_id']);
			$stmt->bindValue(':currentDate', $data['currentDate']);
			$stmt->bindValue(':id', $id);
			if($stmt->execute()) {
				return $this->selectById($id);
			}
		}
		return false;
	}	

	public function selectByFormat($format) {
		$sql = "SELECT * 
						FROM `KK_weeks` 
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
						FROM `KK_weeks` 
						WHERE `id` = :id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':id', $id);
		return $stmt->execute();
	}

	public function insert($data) {
		$errors = $this->getValidationErrors($data);
		if(empty($errors)) {
			$sql = "INSERT INTO `KK_weeks` (`startDate`) 
							VALUES (:startDate)";
			$stmt = $this->pdo->prepare($sql);
			$stmt->bindValue(':startDate', $data['startDate']);
			if($stmt->execute()) {
				$insertedId = $this->pdo->lastInsertId();
				return $this->selectById($insertedId);
			}
		}
		return false;
	}

	public function getValidationErrors($data) {
		$errors = array();
		if(empty($data['startDate'])) {
			$errors['startDate'] = 'field startDate has no value';
		}
		return $errors;
	}

}