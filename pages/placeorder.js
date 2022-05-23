import React, { useContext, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import NextLink from 'next/link';
import Image from 'next/image';
import {
    Grid,
    TableContainer,
    Table,
    Typography,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Link,
    Select,
    MenuItem,
    Button,
    Card,
    List,
    ListItem,
} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
//import useStyles from '../utils/styles';
import CheckoutWizard from '../components/checkoutWizard';

function PlaceOrder() {
    //const classes = useStyles();
    const router = useRouter();
    const { state, dispatch } = useContext(Store);
    const {
        cart: { cartItems, shippingAddress, paymentMethod },
    } = state;
    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.456 => 123.46
    const itemsPrice = round2(
        cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
    );
    const shippingPrice = itemsPrice > 200 ? 0 : 15;
    const taxPrice = round2(itemsPrice * 0.15);
    const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

    useEffect(() => {
        if (!paymentMethod) {
            router.push('/payment');
        }
    }, []);

    return (
        <Layout title="Shopping Cart">
            <Typography component="h5" variant="h5">
                Place Order
            </Typography>

            <Grid container spacing={1}>
                <Grid item md={9} xs={12}>
                    <Card>
                        <List>
                            <ListItem>
                                <Typography component="h4" variant="h4">
                                    Shipping Address
                                </Typography>
                            </ListItem>
                            <ListItem>
                                {shippingAddress.fullName}, {shippingAddress.address},{' '}
                                {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                                {shippingAddress.country}
                            </ListItem>
                        </List>
                    </Card>
                    <Card>
                        <List>
                            <ListItem>
                                <Typography component="h4" variant="h4">
                                    Payment Method
                                </Typography>
                            </ListItem>
                            <ListItem>{paymentMethod}</ListItem>
                        </List>
                    </Card>
                    <Card>
                        <List>
                            <ListItem>
                                <Typography component="h4" variant="h4">
                                    Order Items
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Image</TableCell>
                                                <TableCell>Name</TableCell>
                                                <TableCell align="right">Quantity</TableCell>
                                                <TableCell align="right">Price</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {cartItems.map((item) => (
                                                <TableRow key={item._id}>
                                                    <TableCell>
                                                        <NextLink href={`/product/${item.slug}`} passHref>
                                                            <Link>
                                                                <Image
                                                                    src={item[0].f7}
                                                                    alt={item[0].f5}
                                                                    width={50}
                                                                    height={50}
                                                                ></Image>
                                                            </Link>
                                                        </NextLink>
                                                    </TableCell>

                                                    <TableCell>
                                                        <NextLink href={`/product/${item.slug}`} passHref>
                                                            <Link>
                                                                <Typography>{item[0].f5}</Typography>
                                                            </Link>
                                                        </NextLink>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Typography>quantity</Typography>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Typography>{item[0].f8}</Typography>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </ListItem>
                        </List>
                    </Card>
                </Grid>
                <Grid item md={3} xs={12}>
                    <Card>
                        <List>
                            <ListItem>
                                <Typography variant="h2">Order Summary</Typography>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography>Items:</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography align="right">Ksh{itemsPrice}</Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography>Tax:</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography align="right">Ksh{taxPrice}</Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography>Shipping:</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography align="right">Ksh{shippingPrice}</Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography>
                                            <strong>Total:</strong>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography align="right">
                                            <strong>Ksh{totalPrice}</strong>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Button variant="contained" color="primary" fullWidth>
                                    Place Order
                                </Button>
                            </ListItem>
                        </List>
                    </Card>
                </Grid>
            </Grid>
        </Layout>
    );
}

export default dynamic(() => Promise.resolve(PlaceOrder), { ssr: false });