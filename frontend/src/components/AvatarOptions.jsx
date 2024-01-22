import React, { useState } from "react";
import styles from "./Component.module.css";
import { set } from "date-fns";

function AvatarOptions({ onSelectAvatar }) {
  const [avatar, setAvatar] = useState("");

  function handleSelectAvatar(avatar) {
    setAvatar(avatar);
    onSelectAvatar(avatar);
  }
  return (
    <div>
      <label htmlFor="avatarSelect">Selecciona un Avatar:</label>
      <div className={styles.avatarContainer}>
        <div
          className={`${styles.avatarImg} ${
            avatar ===
              "https://api.dicebear.com/7.x/adventurer/svg?seed=Peanut" &&
            styles.avatarSelected
          }`}
        >
          <img
            src="https://api.dicebear.com/7.x/adventurer/svg?seed=Peanut"
            alt="abc"
            onClick={() =>
              handleSelectAvatar(
                "https://api.dicebear.com/7.x/adventurer/svg?seed=Peanut"
              )
            }
          />
        </div>
        <div
          className={`${styles.avatarImg} ${
            avatar === "https://api.dicebear.com/7.x/adventurer/svg?seed=Max" &&
            styles.avatarSelected
          }`}
        >
          <img
            src="https://api.dicebear.com/7.x/adventurer/svg?seed=Max"
            alt="abc"
            onClick={() =>
              handleSelectAvatar(
                "https://api.dicebear.com/7.x/adventurer/svg?seed=Max"
              )
            }
          />
        </div>
        <div
          className={`${styles.avatarImg} ${
            avatar ===
              "https://api.dicebear.com/7.x/adventurer/svg?seed=Midnight" &&
            styles.avatarSelected
          }`}
        >
          <img
            src="https://api.dicebear.com/7.x/adventurer/svg?seed=Midnight"
            alt="abc"
            onClick={() =>
              handleSelectAvatar(
                "https://api.dicebear.com/7.x/adventurer/svg?seed=Midnight"
              )
            }
          />
        </div>
        <div
          className={`${styles.avatarImg} ${
            avatar ===
              "https://api.dicebear.com/7.x/adventurer/svg?seed=Princess" &&
            styles.avatarSelected
          }`}
        >
          <img
            src="https://api.dicebear.com/7.x/adventurer/svg?seed=Princess"
            alt="abc"
            onClick={() =>
              handleSelectAvatar(
                "https://api.dicebear.com/7.x/adventurer/svg?seed=Princess"
              )
            }
          />
        </div>
        <div
          className={`${styles.avatarImg} ${
            avatar ===
              "https://api.dicebear.com/7.x/adventurer/svg?seed=Coco" &&
            styles.avatarSelected
          }`}
        >
          <img
            src="https://api.dicebear.com/7.x/adventurer/svg?seed=Coco"
            alt="abc"
            onClick={() =>
              handleSelectAvatar(
                "https://api.dicebear.com/7.x/adventurer/svg?seed=Coco"
              )
            }
          />
        </div>
        <div
          className={`${styles.avatarImg} ${
            avatar ===
              "https://api.dicebear.com/7.x/adventurer/svg?seed=Sassy" &&
            styles.avatarSelected
          }`}
        >
          <img
            src="https://api.dicebear.com/7.x/adventurer/svg?seed=Sassy"
            alt="abc"
            onClick={() =>
              handleSelectAvatar(
                "https://api.dicebear.com/7.x/adventurer/svg?seed=Sassy"
              )
            }
          />
        </div>
        <div
          className={`${styles.avatarImg} ${
            avatar ===
              "https://api.dicebear.com/7.x/adventurer/svg?seed=Kiki" &&
            styles.avatarSelected
          }`}
        >
          <img
            src="https://api.dicebear.com/7.x/adventurer/svg?seed=Kiki"
            alt="abc"
            onClick={() =>
              handleSelectAvatar(
                "https://api.dicebear.com/7.x/adventurer/svg?seed=Kiki"
              )
            }
          />
        </div>
        <div
          className={`${styles.avatarImg} ${
            avatar ===
              "https://api.dicebear.com/7.x/adventurer/svg?seed=Bear" &&
            styles.avatarSelected
          }`}
        >
          <img
            src="https://api.dicebear.com/7.x/adventurer/svg?seed=Bear"
            alt="abc"
            onClick={() =>
              handleSelectAvatar(
                "https://api.dicebear.com/7.x/adventurer/svg?seed=Bear"
              )
            }
          />
        </div>
        <div
          className={`${styles.avatarImg} ${
            avatar ===
              "https://api.dicebear.com/7.x/adventurer/svg?seed=Jack" &&
            styles.avatarSelected
          }`}
        >
          <img
            src="https://api.dicebear.com/7.x/adventurer/svg?seed=Jack"
            alt="abc"
            onClick={() =>
              handleSelectAvatar(
                "https://api.dicebear.com/7.x/adventurer/svg?seed=Jack"
              )
            }
          />
        </div>
        <div
          className={`${styles.avatarImg} ${
            avatar === "https://api.dicebear.com/7.x/adventurer/svg?seed=Leo" &&
            styles.avatarSelected
          }`}
        >
          <img
            src="https://api.dicebear.com/7.x/adventurer/svg?seed=Leo"
            alt="abc"
            onClick={() =>
              handleSelectAvatar(
                "https://api.dicebear.com/7.x/adventurer/svg?seed=Leo"
              )
            }
          />
        </div>
        <div
          className={`${styles.avatarImg} ${
            avatar ===
              "https://api.dicebear.com/7.x/adventurer/svg?seed=Abby" &&
            styles.avatarSelected
          }`}
        >
          <img
            src="https://api.dicebear.com/7.x/adventurer/svg?seed=Abby"
            alt="abc"
            onClick={() =>
              handleSelectAvatar(
                "https://api.dicebear.com/7.x/adventurer/svg?seed=Abby"
              )
            }
          />
        </div>
        <div
          className={`${styles.avatarImg} ${
            avatar ===
              "https://api.dicebear.com/7.x/adventurer/svg?seed=Oliver" &&
            styles.avatarSelected
          }`}
        >
          <img
            src="https://api.dicebear.com/7.x/adventurer/svg?seed=Oliver"
            alt="abc"
            onClick={() =>
              handleSelectAvatar(
                "https://api.dicebear.com/7.x/adventurer/svg?seed=Oliver"
              )
            }
          />
        </div>
        <div
          className={`${styles.avatarImg} ${
            avatar ===
              "https://api.dicebear.com/7.x/adventurer/svg?seed=Boots" &&
            styles.avatarSelected
          }`}
        >
          <img
            src="https://api.dicebear.com/7.x/adventurer/svg?seed=Boots"
            alt="abc"
            onClick={() =>
              handleSelectAvatar(
                "https://api.dicebear.com/7.x/adventurer/svg?seed=Boots"
              )
            }
          />
        </div>
        <div
          className={`${styles.avatarImg} ${
            avatar ===
              "https://api.dicebear.com/7.x/adventurer/svg?seed=Loki" &&
            styles.avatarSelected
          }`}
        >
          <img
            src="https://api.dicebear.com/7.x/adventurer/svg?seed=Loki"
            alt="abc"
            onClick={() =>
              handleSelectAvatar(
                "https://api.dicebear.com/7.x/adventurer/svg?seed=Loki"
              )
            }
          />
        </div>
        <div
          className={`${styles.avatarImg} ${
            avatar ===
              "https://api.dicebear.com/7.x/adventurer/svg?seed=Daisy" &&
            styles.avatarSelected
          }`}
        >
          <img
            src="https://api.dicebear.com/7.x/adventurer/svg?seed=Daisy"
            alt="abc"
            onClick={() =>
              handleSelectAvatar(
                "https://api.dicebear.com/7.x/adventurer/svg?seed=Daisy"
              )
            }
          />
        </div>
        <div
          className={`${styles.avatarImg} ${
            avatar ===
              "https://api.dicebear.com/7.x/adventurer/svg?seed=Maggie" &&
            styles.avatarSelected
          }`}
        >
          <img
            src="https://api.dicebear.com/7.x/adventurer/svg?seed=Maggie"
            alt="abc"
            onClick={() =>
              handleSelectAvatar(
                "https://api.dicebear.com/7.x/adventurer/svg?seed=Maggie"
              )
            }
          />
        </div>
        <div
          className={`${styles.avatarImg} ${
            avatar ===
              "https://api.dicebear.com/7.x/adventurer/svg?seed=Pepper" &&
            styles.avatarSelected
          }`}
        >
          <img
            src="https://api.dicebear.com/7.x/adventurer/svg?seed=Pepper"
            alt="abc"
            onClick={() =>
              handleSelectAvatar(
                "https://api.dicebear.com/7.x/adventurer/svg?seed=Pepper"
              )
            }
          />
        </div>
        <div
          className={`${styles.avatarImg} ${
            avatar ===
              "https://api.dicebear.com/7.x/adventurer/svg?seed=Dusty" &&
            styles.avatarSelected
          }`}
        >
          <img
            src="https://api.dicebear.com/7.x/adventurer/svg?seed=Dusty"
            alt="abc"
            onClick={() =>
              handleSelectAvatar(
                "https://api.dicebear.com/7.x/adventurer/svg?seed=Dusty"
              )
            }
          />
        </div>
      </div>
    </div>
  );
}

export default AvatarOptions;
