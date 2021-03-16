package com.study.appstore.models.dto;

import java.io.Serializable;
import java.time.Instant;

public class BillUserDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;
    private double total;
    private String address;
    private boolean paidOut;
    private PaymentDTO payment;
    private String referenceCode;
    private UserDTO user;
    private StateDTO state;
    private Instant createAt;
    private Instant updateAt;

    public BillUserDTO() {
    }

    public BillUserDTO(Long id, double total, String address, boolean paidOut, PaymentDTO payment, String referenceCode,
            UserDTO user, StateDTO state, Instant createAt, Instant updateAt) {
        this.id = id;
        this.total = total;
        this.address = address;
        this.paidOut = paidOut;
        this.payment = payment;
        this.referenceCode = referenceCode;
        this.user = user;
        this.state = state;
        this.createAt = createAt;
        this.updateAt = updateAt;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getTotal() {
        return this.total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public String getAddress() {
        return this.address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public boolean isPaidOut() {
        return this.paidOut;
    }

    public boolean getPaidOut() {
        return this.paidOut;
    }

    public void setPaidOut(boolean paidOut) {
        this.paidOut = paidOut;
    }

    public PaymentDTO getPayment() {
        return this.payment;
    }

    public void setPayment(PaymentDTO payment) {
        this.payment = payment;
    }

    public String getReferenceCode() {
        return this.referenceCode;
    }

    public void setReferenceCode(String referenceCode) {
        this.referenceCode = referenceCode;
    }

    public UserDTO getUser() {
        return this.user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    public StateDTO getState() {
        return this.state;
    }

    public void setState(StateDTO state) {
        this.state = state;
    }

    public Instant getCreateAt() {
        return this.createAt;
    }

    public void setCreateAt(Instant createAt) {
        this.createAt = createAt;
    }

    public Instant getUpdateAt() {
        return this.updateAt;
    }

    public void setUpdateAt(Instant updateAt) {
        this.updateAt = updateAt;
    }

    @Override
    public String toString() {
        return "{" + " id='" + id + "'" + ", total='" + total + "'" + ", address='" + address + "'" + ", paidOut='"
                + paidOut + "'" + ", payment='" + payment + "'" + ", referenceCode='" + referenceCode + "'" + ", user='"
                + user + "'" + ", state='" + state + "'" + ", createAt='" + createAt + "'" + ", updateAt='" + updateAt
                + "'" + "}";
    }

}
