const calTotal = (orderDetails) => {
	return orderDetails.reduce((currentTotal, detail) => {
		return currentTotal + detail.quantity * detail.product.price;
	}, 0);
}

export default calTotal;