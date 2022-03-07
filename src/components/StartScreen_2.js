import React from "react";
import "./startScreen.css";

const Start_Screen = (props) => {
    return (
        // <div className='container-user-input'>
        <div className='container-start-screen'>
            <div className='container-background'>
                <h1 className='title mg-bottom'>quizzical</h1>
                <p className='sub-title mg-bottom'>sub title</p>

                <form action='' className='usr-input'>
                    <label htmlFor='selectList' className='select-label'>
                        category
                        <select
                            name='selectList'
                            id='selectList'
                            className='select-list categories'
                        >
                            <option value='any'>Any</option>
                            <option value='General Knowledge'>
                                General Knowledge
                            </option>
                            <option value='Entertainment: Books'>Books</option>
                            <option value='Entertainment: Film'>Film</option>
                            <option value='Entertainment: Music'>Music</option>
                            <option value='Entertainment: Musicals & Theatres'>
                                Musicals & Theatres
                            </option>
                            <option value='Entertainment: Television'>
                                Television
                            </option>
                            <option value='Entertainment: Video Games'>
                                Video Games
                            </option>
                            <option value='Entertainment: Board Games'>
                                Board Games
                            </option>
                            <option value='Science & Nature'>
                                Science & Nature
                            </option>
                            <option value='Science: Computers'>
                                Computers
                            </option>
                            <option value='Science: Mathematics'>
                                Mathematics
                            </option>
                            <option value='Mythology'>Mythology</option>
                            <option value='Sports'>Sports</option>
                            <option value='Geography'>Geography</option>
                            <option value='History'>History</option>
                            <option value='Politics'>Politics</option>
                            <option value='Art'>Art</option>
                            <option value='Celebrities'>Celebrities</option>
                            <option value='Animals'>Animals</option>
                            <option value='Vehicles'>Vehicles</option>
                            <option value='Entertainment: Comics'>
                                Comics
                            </option>
                            <option value='Science: Gadgets'>Gadgets</option>
                            <option value='Entertainment: Japanese Anime & Manga'>
                                Japanese Anime & Manga
                            </option>
                            <option value='Entertainment: Cartoon & Animations'>
                                Cartoon & Animations
                            </option>
                        </select>
                    </label>

                    <label htmlFor='selectList' className='select-label'>
                        difficulty
                        <select
                            name='selectList'
                            id='selectList'
                            className='select-list difficulty'
                        >
                            <option value='Any'>Any</option>
                            <option value='easy'>Easy</option>
                            <option value='medium'>Medium</option>
                            <option value='hard'>Hard</option>
                        </select>
                    </label>

                    <label htmlFor='selectList' className='select-label'>
                        quiz length
                        <select
                            name='selectList'
                            id='selectList'
                            className='select-list quiz-length'
                        >
                            {/* <option value='1'>1</option> */}
                            <option value='5'>5</option>
                            <option value='10'>10</option>
                            <option value='15'>15</option>
                            <option value='20'>20</option>
                            <option value='20'>25</option>
                            <option value='20'>30</option>
                            <option value='20'>35</option>
                            <option value='20'>40</option>
                            <option value='20'>45</option>
                            <option value='20'>50</option>
                        </select>
                    </label>
                    <button
                        className='start-quiz-btn'
                        onClick={props.handleClick}
                    >
                        Start Quiz
                    </button>
                </form>
            </div>
        </div>

        // </div>
    );
};

export default Start_Screen;
