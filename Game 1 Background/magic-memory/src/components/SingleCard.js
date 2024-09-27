import './SingleCard.css';

export default function SingleCard({ card, handleChoice, flipped, disabled }) {
    const handleClick = () => {
        if (!disabled) {
            handleChoice(card);
        }
    };

    return (
        <div className={`card ${flipped ? 'flipped' : ''}`} onClick={handleClick}>
            <div className="inner-card">
                <img className="front" src={card.src} alt="card front" />
                <img 
                    className="back" 
                    src="/img/1.jpg" 
                    alt="card back" 
                />
            </div>
        </div>
    );
}
