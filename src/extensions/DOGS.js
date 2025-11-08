/*
This extension is inspired by Gen1x's CATS Extension
*/
(function(Scratch) {
    const prefix = "DOGS_"
    const variables = {};

    if (!Scratch.extensions.unsandboxed) {
      throw new Error("this extension must be run unsandboxed");
    }

    let dogBreeds = [
      'Beagle',
      'Border Collie',
      'Bulldog',
      'Chihuahua',
      'Cocker Spaniel',
      'Dachshund',
      'Dobermann',
      'German Shepherd',
      'Golden Retriever',
      'Labrador Retriever',
      'Pomeranian',
      'Poodle',
      'Rottweiler',
      'Shih Tzu',
      'Siberian Husky',
      'Yorkshire Terrier'
    ];

    class Extension {
        getInfo() {
            return {
              id: "ilikebothcatsanddogs",
              name: "DOGS",
              color1: "#C7C000",
              color2: "#8C8F00",
              blocks: [
                {
                  opcode: prefix + 'cool',
                  blockType: Scratch.BlockType.BOOLEAN,
                  text: 'are dogs cool?',
                  disableMonitor: true,
                },
                {
                  opcode: prefix + 'info',
                  blockType: Scratch.BlockType.REPORTER,
                  text: 'get info of breed [BREED]',
                  disableMonitor: true,
                  arguments: {
                    BREED: {
                      type: Scratch.ArgumentType.STRING,
                      menu: 'BREED_MENU'
                    }
                  }
                }
              ],
              menus: {
                BREED_MENU: {
                  acceptReporters: true,
                  items: dogBreeds
                }
              }
            }
        }
        DOGS_cool() {
          return true;
        }
        DOGS_info(args) {
          if (!dogBreeds.includes(args.BREED)) {
            // `args.BREED` is not any of the dog breeds in the `dogBreeds` array
            return "I won't let you exploit this."
          }
        
          let breed = args.BREED

          if (breed == "Chihuahua") {
            breed += " (dog breed)"
            console.log(breed)
            console.log(encodeURIComponent(breed))
          } else if (breed == "Pomeranian") {
            breed += " dog"
            console.log(breed)
            console.log(encodeURIComponent(breed))
          }
        
          return fetch("https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exlimit=1&titles=" + encodeURIComponent(breed) + "&explaintext=1&exsectionformat=plain&format=json&origin=*")
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error('Network response was not OK.');
              }
            })
            .then((data) => {
              // Extract the relevant information from the data object
              const pageId = Object.keys(data.query.pages)[0];
              let extract = data.query.pages[pageId].extract;
              extract = extract.replace(/\s{2,}/g, ' ');
              return extract.split('.').slice(0, 2).join('.') + '. (https://en.wikipedia.org/wiki/' + breed.replace(/\s/g, '_') + ")";
            })
            .catch((error) => {
              console.error(error);
              return 'Uh oh! Something went wrong.';
            });
        }
    }

    Scratch.extensions.register(new Extension());
})(Scratch);