import Axios from "axios";

export class MainView extends React.Component {
     //one of the 'hooks' available in a react component
     componentDidMount() {
          Axios.get('<my-api-endpoint/films')
          .then(response => {
               //assign the result to the state
               this.setState({
                    films: response.data
               });
          })
          .catch(function(error) {
               console.log(error);
          });
     }

     render() {
          //if the state isn't initualized, this will throw on runtime bedore the data is initially loaded
          const { films } = this.state;

          //before the films have been loaded
          if (!films) return ( <div className="main-view">;
          { films.map(film => (
               <div className="film-card" key={film._id}>{film.Title}</div>
          ))}
          </div>
          );
     }
     }