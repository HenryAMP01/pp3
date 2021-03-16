package com.study.appstore.models.entities;

import java.io.Serializable;
import java.time.Instant;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
public class Bill implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Min(value = 0)
    private double total;

    @NotNull
    @ManyToOne
    private User user;

    @NotNull
    @NotEmpty
    @Size(min = 5, max = 150)
    private String address;

    private boolean paidOut;

    @NotNull
    @ManyToOne
    private Payment payment;

    @ManyToOne
    private State state;

    private String referenceCode;

    private Instant createAt;

    private Instant updateAt;

    public Bill() {
        this.createAt = Instant.now();
        this.updateAt = Instant.now();
    }

    public Bill(Long id, double total, User user, String address, boolean paidOut, Payment payment, State state,
            String referenceCode, Instant createAt, Instant updateAt) {
        this.id = id;
        this.total = total;
        this.user = user;
        this.address = address.trim().toUpperCase();
        this.paidOut = paidOut;
        this.payment = payment;
        this.state = state;
        this.referenceCode = referenceCode;
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

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getAddress() {
        return this.address;
    }

    public void setAddress(String address) {
        this.address = address.trim().toUpperCase();
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

    public Payment getPayment() {
        return this.payment;
    }

    public void setPayment(Payment payment) {
        this.payment = payment;
    }

    public State getState() {
        return this.state;
    }

    public void setState(State state) {
        this.state = state;
    }

    public String getReferenceCode() {
        return this.referenceCode;
    }

    public void setReferenceCode(String referenceCode) {
        this.referenceCode = referenceCode;
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
        return "{" + " id='" + id + "'" + ", total='" + total + "'" + ", user='" + user + "'" + ", address='" + address
                + "'" + ", paidOut='" + paidOut + "'" + ", payment='" + payment + "'" + ", state='" + state + "'"
                + ", referenceCode='" + referenceCode + "'" + ", createAt='" + createAt + "'" + ", updateAt='"
                + updateAt + "'" + "}";
    }

}
