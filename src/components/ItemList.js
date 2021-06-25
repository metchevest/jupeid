import React from "react";

const ItemList = ({items}) => {

    const renderItems = () => {
        return items.maps(item => {
            return(
            <div className="center-panel">
			<div className="ui grid container">
				<div className="two wide column border">
					<div className="inline-name-check">
                        {item.name}
						<label className="switch">
							<input type="checkbox" />
							<span className="slider"></span>
						</label>
					</div>
				</div>
			</div>
	        </div>
            );
        });
    };

	return (
		{renderItems()    }
	);
};

export default ItemList;
