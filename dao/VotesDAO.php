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

	public function insert($data) {
		$errors = $this->getValidationErrors($data);
		if(empty($errors)) {
			$sql = "INSERT INTO `KK_votes` (`artist`, `title`, `format`) 
							VALUES (:artist, :title, :format)";
			$stmt = $this->pdo->prepare($sql);
			$stmt->bindValue(':artist', $data['artist']);
			$stmt->bindValue(':title', $data['title']);
			$stmt->bindValue(':format', $data['format']);
			if($stmt->execute()) {
				$insertedId = $this->pdo->lastInsertId();
				return $this->selectById($insertedId);
			}
		}
		return false;
	}

	public function getValidationErrors($data) {
		$errors = array();
		if(empty($data['artist'])) {
			$errors['artist'] = 'field artist has no value';
		}
		if(empty($data['title'])) {
			$errors['title'] = 'field title has no value';
		}
		if(empty($data['format'])) {
			$errors['format'] = 'field format has no value';
		}
		return $errors;
	}

}