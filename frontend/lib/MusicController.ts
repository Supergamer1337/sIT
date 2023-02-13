const musicController = async (controlType: string) => {
  try {
    const response = await fetch(
      "http://localhost:8080/api/control/" + controlType,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response) throw Error("Response is empty");
  } catch (error) {
    console.error(error);
  }
};

export const playMusic = async () => {
  musicController("play");
};

export const pauseMusic = async () => {
  musicController("pause");
};

export const nextSong = async () => {
  musicController("next");
};

export const previousSong = () => {
  musicController("previous");
};

export const startSong = async (songURI: string) => {
  try {
    const response = await fetch(`http://localhost:8080/api/play/song`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ songURI: songURI }),
    });
    const json = await response.json();
    if (json.status === 200) {
      console.log("Song played");
    } else {
      throw Error("Song could not be played");
    }
  } catch (error: any) {
    console.log(error);
  }
};
